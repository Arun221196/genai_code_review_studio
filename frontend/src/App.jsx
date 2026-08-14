import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import axios from "axios";

function App() {
  const [code, setCode] = useState(`def sum():  \n  return a + b \n`);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review/", { code });
      setReview(response.data);
    } catch (error) {
      setReview("⚠️ Something went wrong while generating the review. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target.result);
      };
      reader.readAsText(file);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 px-4 py-8 text-slate-800">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 rounded-2xl border border-blue-100 bg-white/80 px-6 py-5 shadow-lg shadow-blue-100/60 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-between gap-2 md:flex-row md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-600">AI assistant</p>
              <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Code Review Studio ✨</h1>
            </div>
            <div className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm">
              Smart feedback in seconds
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-6 lg:flex-row">
          <section className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 lg:w-2/5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <label className="flex-1">
                <span className="mb-2 block text-sm font-medium text-slate-700">Upload a file</span>
                <input
                  type="file"
                  accept=".js, .py, .css, .cpp, .cs, .ts, .html, .json, .java"
                  onChange={handleFileUpload}
                  className="block w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-500"
                />
              </label>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-inner shadow-slate-700/30">
              <Editor
                value={code}
                onValueChange={(nextCode) => setCode(nextCode)}
                highlight={(codeValue) => prism.highlight(codeValue, prism.languages.javascript, "javascript")}
                padding={14}
                style={{
                  fontFamily: "Fira Code, Consolas, monospace",
                  fontSize: 15,
                  minHeight: 340,
                  // background: "#ffffff",
                  // color: "#020817",
                  background: "#020817",
                  color: "#e2e8f0",
                }}
              />
            </div>

            <button
              onClick={reviewCode}
              disabled={isLoading}
              className="mt-5 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-lg font-semibold text-white shadow-lg shadow-blue-300/60 transition duration-300 hover:from-blue-500 hover:to-indigo-500 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "Reviewing Code..." : "Analyze Code ✨"}
            </button>
          </section>

          <aside className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 lg:w-3/5">
            <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-xl font-semibold text-slate-900">Review Output</h2>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Ready
              </span>
            </div>

            <div className="prose prose-slate max-w-none rounded-xl bg-slate-50 p-4 text-slate-700">
              <Markdown rehypePlugins={[rehypeHighlight]}>{review || "Your AI review will appear here."}</Markdown>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;
