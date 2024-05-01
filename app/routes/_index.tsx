import { OutputData } from "@editorjs/editorjs";
import { json, type MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { ClientOnly } from "remix-utils/client-only";
import editorJSHTML from "editorjs-html";

import Editor from "~/components/Editor";

const editorJSParse = editorJSHTML();

export const meta: MetaFunction = () => {
  return [
    { title: "Remix x EditorJS" },
    {
      name: "description",
      content: "editorjs playground built on top of remix framework",
    },
  ];
};

export async function loader() {
  return json({});
}

export default function Index() {
  const [content, setContent] = useState<OutputData | undefined>({
    blocks: [
      {
        id: "zbGZFPM-iI",
        type: "paragraph",
        data: {
          text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.",
        },
      },
    ],
  });

  return (
    <div className="dark:text-white mx-auto">
      <div className="my-10 md:my-20 dark:text-white">
        <h1 className="text-center mb-5 font-mono text-2xl font-bold md:text-4xl md:mb-10">
          <span className="block">Remix EditorJS</span>
        </h1>
      </div>
      <div className="flex">
        <div className="grow w-[50%]">
          <ClientOnly fallback={null}>
            {() => (
              <Editor
                elementHolder="editorjs"
                data={content}
                onChangeContent={setContent}
              />
            )}
          </ClientOnly>
        </div>
        <div className="grow w-[50%]">
          {/* TODO: action to switch to see block style or to see rendered output */}
          <div
            dangerouslySetInnerHTML={{
              __html: editorJSParse.parse(content as any).join(" "),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
