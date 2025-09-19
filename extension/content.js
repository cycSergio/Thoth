// 感知用户在页面上选中了文本 -> 拿到选中的文本及其屏幕位置 -> 显示悬浮按钮
// 监听用户点击悬浮按钮 -> 发送消息给后台脚本，传递选中的文本 -> 后台脚本调用API获取结果 -> 返回结果给内容脚本 -> 内容脚本显示结果
// import heron from "../src/components/heron"

let btn, panel, lastSelectionText = '';

function ensureButton() {
    if (btn) return btn;
    btn = document.createElement('div');
    btn.className = 'selask-btn';
    btn.textContent = '问 GPT';
    btn.style.display = 'none';
    btn.addEventListener('click', onAsk);
    document.documentElement.appendChild(btn);
    return btn;
}

function ensurePanel() {
    if (panel) return panel;
    panel = document.createElement('div');
    panel.className = 'selask-panel';
    panel.innerHTML = `
    <div class="selask-hd">GPT</div>
    <div class="selask-bd" id="selask-body">等一下下…</div>
    <div class="selask-ft">
      <button id="selask-close">关闭</button>
      <button id="selask-copy">复制</button>
    </div>`;
    document.documentElement.appendChild(panel);
    panel.querySelector('#selask-close').onclick = () => panel.remove();
    panel.querySelector('#selask-copy').onclick = () => {
        const t = panel.querySelector('#selask-body').textContent || '';
        navigator.clipboard.writeText(t);
    };
    return panel;
}

function updateSelectionUI() {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) { if (btn) btn.style.display = 'none'; return; }

    const text = sel.toString().trim();
    if (!text) { if (btn) btn.style.display = 'none'; return; }

    lastSelectionText = text;

    // 取选区矩形定位按钮
    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    if (!rect || (rect.width === 0 && rect.height === 0)) { if (btn) btn.style.display = 'none'; return; }

    const b = ensureButton();
    b.style.top  = `${window.scrollY + rect.top - 34}px`; // 放到选区上方一点
    b.style.left = `${window.scrollX + rect.left}px`;
    b.style.display = 'block';
}

async function onAsk() {
    ensurePanel();
    const body = document.querySelector('#selask-body');
    // 最小占位：先把选区回显。接后端/Service Worker 时把这段替换为发送请求的逻辑
    body.textContent = `选中了：\n${lastSelectionText.slice(0, 400)}${lastSelectionText.length>400?'…':''}`;
}

document.addEventListener('mouseup', updateSelectionUI);
