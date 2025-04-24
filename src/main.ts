import { exec } from 'child_process';
import { promisify } from 'util';
import { PLAPI, PLExtAPI, PLExtension, PLMainAPI } from "paperlib-api/api";
import { PaperEntity } from "paperlib-api/model";

class PaperlibObsidianExtension extends PLExtension {
  disposeCallbacks: (() => void)[];

  constructor() {
    super({
      id: "paperlib-obsidian-integration",
      defaultPreference: {
        enableProtocolHandler: {
          type: "boolean",
          name: "Enable Protocol Handler",
          description: "Enable Obsidian protocol integration",
          value: true,
          order: 0
        }
      },
    });

    this.disposeCallbacks = [];
  }

  async initialize() {
    // 注册扩展偏好设置
    await PLExtAPI.extensionPreferenceService.register(
      this.id,
      this.defaultPreference,
    );

    // 注册上下文菜单
    PLMainAPI.contextMenuService.registerContextMenu(this.id, [
      {
        id: "open-in-obsidian",
        label: "在 Obsidian 中打开",
      }
    ]);

    // 注册上下文菜单点击事件
    this.disposeCallbacks.push(
      PLMainAPI.contextMenuService.on(
        "dataContextMenuFromExtensionsClicked",
        (value) => {
          const { extID, itemID } = value.value;
          if (extID === this.id && itemID === "open-in-obsidian") {
            this.openSelectedPaperInObsidian();
          }
        },
      )
    );

    // 注册命令
    this.disposeCallbacks.push(
      PLAPI.commandService.on(
        "paperlib-obsidian-open-selected-paper" as any,
        () => {
          this.openSelectedPaperInObsidian();
        },
      )
    );

    // 注册外部命令
    this.disposeCallbacks.push(
      PLAPI.commandService.registerExternel({
        id: `openInObsidian`,
        description: "在 Obsidian 中打开选中的文献",
        event: "paperlib-obsidian-open-selected-paper",
      })
    );

    PLAPI.logService.info(
      "PaperLib-Obsidian integration initialized",
      "",
      false,
      "ObsidianIntegration"
    );
  }

  async dispose() {
    // 注销扩展偏好设置
    PLExtAPI.extensionPreferenceService.unregister(this.id);
    
    // 注销上下文菜单
    PLMainAPI.contextMenuService.unregisterContextMenu(this.id);
    
    // 注销所有回调
    this.disposeCallbacks.forEach((callback) => callback());
    
    PLAPI.logService.info(
      "PaperLib-Obsidian integration disposed",
      "",
      false,
      "ObsidianIntegration"
    );
  }

  async openSelectedPaperInObsidian() {
    try {
      // 获取选中的文献
      const selectedPaperEntities = (await PLAPI.uiStateService.getState(
        "selectedPaperEntities"
      )) as PaperEntity[];

      if (selectedPaperEntities.length === 0) {
        PLAPI.logService.warn(
          "No paper selected",
          "",
          true,
          "ObsidianIntegration"
        );
        return;
      }

      // 获取第一个选中的文献
      const paper = selectedPaperEntities[0];
      
      // 记录日志
      PLAPI.logService.info(
        "Opening paper in Obsidian",
        paper.title,
        false,
        "ObsidianIntegration"
      );

      // 获取扩展设置
      const enableProtocolHandler = await PLExtAPI.extensionPreferenceService.get(
        this.id,
        "enableProtocolHandler"
      );

      if (!enableProtocolHandler) {
        PLAPI.logService.warn(
          "Protocol handler is disabled in settings",
          "",
          true,
          "ObsidianIntegration"
        );
        return;
      }

      // 构造 URL 参数，确保所有值都是字符串类型
      const params = new URLSearchParams();
      // 将 ObjectId 转换为字符串
      params.append("id", paper.id.toString());
      params.append("title", paper.title || "");
      params.append("authors", paper.authors || "");
      params.append("year", paper.pubTime || "");
      params.append("doi", paper.doi || "");

      // 构造 obsidian:// URL
      const url = `obsidian://paperlib-open?${params.toString()}`;
      
      // 使用 macOS open 命令打开 URL
      try {
        const execAsync = promisify(exec);
        await execAsync(`open "${url}"`);
      } catch (err) {
        throw new Error(`Failed to open Obsidian: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
      
      PLAPI.logService.info(
        "Paper opened in Obsidian",
        paper.title,
        true,
        "ObsidianIntegration"
      );
    } catch (error) {
      PLAPI.logService.error(
        "Failed to open paper in Obsidian",
        error as Error,
        true,
        "ObsidianIntegration"
      );
    }
  }
}

async function initialize() {
  const extension = new PaperlibObsidianExtension();
  await extension.initialize();
  return extension;
}

export { initialize };
