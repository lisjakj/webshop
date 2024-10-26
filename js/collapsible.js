// Collapsible Functionality
function toggleSection(sectionId) {
    const collapsibleContent = document.getElementById(`${sectionId}-content`);
    const collapsibleRow = document.getElementById(sectionId);

    // Toggle expanded class
    collapsibleRow.classList.toggle('expanded');
    collapsibleContent.classList.toggle('expanded');

    // Animate smooth opening and closing
    if (collapsibleContent.classList.contains('expanded')) {
        collapsibleContent.style.maxHeight = collapsibleContent.scrollHeight + 'px';
    } else {
        collapsibleContent.style.maxHeight = '0';
    }
}