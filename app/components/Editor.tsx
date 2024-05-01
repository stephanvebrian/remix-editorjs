import { OutputData } from "@editorjs/editorjs";
import { memo, useEffect, useRef } from "react";
import "~/styles/editor.css";

interface EditorComponentParam {
  elementHolder: string;
  data: OutputData | undefined;
  onChangeContent: (data: OutputData) => void;
}

const EditorComponent = (param: EditorComponentParam) => {
  const effectCalled = useRef(false); // this to prevent component render twice in StrictMode in development
  const ejInstance = useRef<any>();

  const initEditorInstance = async () => {
    const { default: EditorJS } = await import("@editorjs/editorjs");

    const editor = new EditorJS({
      holder: param.elementHolder,
      data: param.data,
      onReady: () => {
        console.log(`[EditorComponent] ej instance ready to use`);
      },
      onChange: async (api) => {
        const data = await api.saver.save();
        console.log(`onChange data:`, data);
        param.onChangeContent(data);
      },
    });

    ejInstance.current = editor;
  };

  useEffect(() => {
    if (effectCalled.current) return;
    if (!ejInstance.current) {
      console.log("[EditorComponent] initializing instance");
      initEditorInstance();
    }

    effectCalled.current = true;

    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  return <div id={param.elementHolder}></div>;
};

export default memo(EditorComponent);
// export default EditorComponent;
