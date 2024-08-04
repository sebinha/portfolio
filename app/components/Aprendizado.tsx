'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(() => import('react-monaco-editor'), { ssr: false });

const GITHUB_API_BASE = 'https://api.github.com/repos';
const OWNER = 'sebinha'; // Substitua com seu nome de usuário do GitHub
const REPO = 'study-codes-udemy'; // Substitua com o nome do seu repositório
const BRANCH = 'main'; // Substitua com o nome do seu branch
const ACCESS_TOKEN = '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'; // Substitua pelo seu token de acesso

const fetchRepositoryContents = async (path = '') => {
  const url = `${GITHUB_API_BASE}/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${ACCESS_TOKEN}`,
    },
  });

  if (response.ok) {
    return response.json();
  } else {
    console.error('Failed to fetch repository contents', response.status, response.statusText);
    return [];
  }
};

const Aprendizado: React.FC = () => {
  const [treeData, setTreeData] = useState<any>({ name: REPO, children: [] });
  const [content, setContent] = useState<string>('');
  const [currentPath, setCurrentPath] = useState<string>('');
  const editorRef = useRef<any>(null);

  useEffect(() => {
    const loadTreeData = async () => {
      const data = await fetchRepositoryContents();
      const formattedData = data.map((item: any) => ({
        name: item.name,
        type: item.type,
        path: item.path,
        children: item.type === 'dir' ? [] : undefined,
      }));
      setTreeData({ name: REPO, toggled: true, children: formattedData });
    };

    loadTreeData();
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current.editor;
      editor.updateOptions({
        fontFamily:
          "'Fira Code', 'Source Code Pro', 'Consolas', 'Monaco', 'DejaVu Sans Mono', 'Ubuntu Mono', monospace",
        fontSize: 14,
        lineHeight: 22,
      });
    }
  }, [editorRef.current]);

  const fetchFileContent = async (path: string) => {
    const url = `${GITHUB_API_BASE}/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${ACCESS_TOKEN}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.content) {
        return atob(data.content);
      }
    } else {
      console.error('Failed to fetch file content', response.status, response.statusText);
    }
    return '';
  };

  const onToggle = async (node: any, toggled: boolean) => {
    if (node.type === 'dir') {
      if (toggled && (!node.children || node.children.length === 0)) {
        const data = await fetchRepositoryContents(node.path);
        node.children = data.map((item: any) => ({
          name: item.name,
          type: item.type,
          path: item.path,
          children: item.type === 'dir' ? [] : undefined,
        }));
      }
      node.toggled = toggled;
      setTreeData({ ...treeData });
    } else {
      setCurrentPath(node.path);
      const fileContent = await fetchFileContent(node.path);
      setContent(fileContent);
    }
  };

  return (
    <div className="Aprendizado">
      <div className="sidebar">
        {treeData && <FileExplorer data={treeData} onToggle={onToggle} />}
      </div>
      <div className="editor">
        <MonacoEditor
          ref={editorRef}
          width="100%"
          height="100%"
          language="plaintext"
          theme="vs-dark"
          value={content}
          options={{
            fontFamily:
              "'Fira Code', 'Source Code Pro', 'Consolas', 'Monaco', 'DejaVu Sans Mono', 'Ubuntu Mono', monospace",
            fontSize: 14,
            lineHeight: 22,
            readOnly: true,
          }}
        />
      </div>
    </div>
  );
};

const FileExplorer: React.FC<{ data: any; onToggle: (node: any, toggled: boolean) => void }> = ({
  data,
  onToggle,
}) => {
  return (
    <ul className="file-tree">
      {data.children.map((item: any) => (
        <FileNode key={item.path} node={item} onToggle={onToggle} />
      ))}
    </ul>
  );
};

const FileNode: React.FC<{ node: any; onToggle: (node: any, toggled: boolean) => void }> = ({
  node,
  onToggle,
}) => {
  return (
    <li className={`file-node ${node.type}`}>
      <div className="file-node-content" onClick={() => onToggle(node, !node.toggled)}>
        {node.type === 'dir' ? (
          <span className={`file-node-name ${node.toggled ? 'open' : 'closed'}`}>{node.name}</span>
        ) : (
          <span className="file-node-name">{node.name}</span>
        )}
      </div>
      {node.toggled && node.children && (
        <ul className="file-tree">
          {node.children.map((child: any) => (
            <FileNode key={child.path} node={child} onToggle={onToggle} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Aprendizado;
