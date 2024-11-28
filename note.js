// Navigate to specific tool page
function navigateToTool(toolName) {
    window.location.href = `${toolName}.html`;
}

// Filter tools based on search input
function filterTools() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const tools = document.querySelectorAll('.tool-card');
    tools.forEach(tool => {
        const toolName = tool.innerText.toLowerCase();
        if (toolName.includes(query)) {
            tool.style.display = 'block';
        } else {
            tool.style.display = 'none';
        }
    });
}
