import React, { useState } from 'react';
import { X, Copy, Check, Download, GitBranch, Terminal, ExternalLink, Globe } from 'lucide-react';

interface GithubDeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WORKFLOW_YAML_CONTENT = `name: Deploy Kid Chess Web App to GitHub Pages

on:
  push:
    branches: ["main", "master"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: Install Dependencies
        run: npm ci || npm install

      - name: Build Web Application
        env:
          GITHUB_PAGES: "true"
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: "./dist"

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;

export const GithubDeployGuideModal: React.FC<GithubDeployGuideModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(WORKFLOW_YAML_CONTENT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([WORKFLOW_YAML_CONTENT], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'deploy.yml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto text-white shadow-2xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 text-2xl font-black shadow-lg">
            <GitBranch className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-emerald-400">GitHub Pages Automatic CI/CD</h2>
            <p className="text-xs text-slate-400">
              Publish your Kid Chess Web App automatically to GitHub Pages every time you push code!
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-xs flex items-center justify-center mb-2">
                1
              </div>
              <h4 className="text-xs font-bold text-white mb-1">Created Workflow File</h4>
              <p className="text-[11px] text-slate-400">
                The file <code className="text-amber-300">.github/workflows/deploy.yml</code> is already configured in this project.
              </p>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-xs flex items-center justify-center mb-2">
                2
              </div>
              <h4 className="text-xs font-bold text-white mb-1">Push to GitHub</h4>
              <p className="text-[11px] text-slate-400">
                Push your code repository to GitHub (<code className="text-amber-300">main</code> or <code className="text-amber-300">master</code> branch).
              </p>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-xs flex items-center justify-center mb-2">
                3
              </div>
              <h4 className="text-xs font-bold text-white mb-1">Enable Pages Actions</h4>
              <p className="text-[11px] text-slate-400">
                In GitHub Repo -&gt; <span className="text-amber-300">Settings</span> -&gt; <span className="text-amber-300">Pages</span>, set Source to <span className="text-emerald-400 font-bold">GitHub Actions</span>.
              </p>
            </div>
          </div>

          {/* Workflow Code Viewer */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>.github/workflows/deploy.yml</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copied ? 'Copied!' : 'Copy YAML'}</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download file</span>
                </button>
              </div>
            </div>

            <pre className="bg-slate-900 p-4 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto max-h-56 leading-relaxed border border-slate-800 select-all">
              {WORKFLOW_YAML_CONTENT}
            </pre>
          </div>

          <div className="bg-emerald-950/30 p-4 rounded-2xl border border-emerald-500/30 text-xs text-emerald-200 space-y-1">
            <div className="font-bold flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Live Deployment URL</span>
            </div>
            <p className="text-[11px] text-emerald-300/80">
              Once deployed, your app will automatically be live at{' '}
              <code className="text-amber-300 font-mono">https://&lt;your-username&gt;.github.io/&lt;repo-name&gt;/</code>!
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
