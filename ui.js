// UI Configuration data
const controlSections = [
    {
        title: "Light Position",
        controls: [
            { id: "lightX", label: "Light Position X", min: -10, max: 10, value: 5, step: 0.5 },
            { id: "lightY", label: "Light Position Y", min: -10, max: 10, value: 5, step: 0.5 },
            { id: "lightZ", label: "Light Position Z", min: -10, max: 10, value: 5, step: 0.5 }
        ]
    },
    {
        title: "Sphere Properties",
        controls: [
            { id: "sphereX", label: "Position X", min: -10, max: 10, value: 0, step: 0.5 },
            { id: "sphereY", label: "Position Y", min: -10, max: 10, value: 0, step: 0.5 },
            { id: "sphereZ", label: "Position Z", min: -10, max: 10, value: -2, step: 0.5 },
            { id: "sphereRadius", label: "Radius", min: 0.1, max: 5, value: 1, step: 0.1 }
        ]
    },
    {
        title: "Sphere Color",
        controls: [
            { id: "sphereRed", label: "Red", min: 0, max: 255, value: 255, step: 1 },
            { id: "sphereGreen", label: "Green", min: 0, max: 255, value: 0, step: 1 },
            { id: "sphereBlue", label: "Blue", min: 0, max: 255, value: 0, step: 1 }
        ]
    },
    {
        title: "Background Color",
        controls: [
            { id: "bgRed", label: "Red", min: 0, max: 255, value: 0, step: 1 },
            { id: "bgGreen", label: "Green", min: 0, max: 255, value: 0, step: 1 },
            { id: "bgBlue", label: "Blue", min: 0, max: 255, value: 0, step: 1 }
        ]
    }
];

// Template function for creating a control group
function createControlGroup(control) {
    return `
        <div class="control-group">
            <label>${control.label}: <span id="${control.id}Value">${control.value}</span></label>
            <div class="input-container">
                <input type="range" id="${control.id}" 
                    min="${control.min}" max="${control.max}" value="${control.value}" step="${control.step}">
                <input type="number" id="${control.id}Text" 
                    value="${control.value}" step="${control.step}" min="${control.min}" max="${control.max}">
            </div>
        </div>
    `;
}

// Template function for creating a dropdown section
function createDropdownSection(section) {
    const controlsHtml = section.controls.map(control => createControlGroup(control)).join('');
    
    return `
        <div class="dropdown-section">
            <div class="dropdown-header">
                <h4>${section.title}</h4>
                <span class="dropdown-icon">▼</span>
            </div>
            <div class="dropdown-content">
                ${controlsHtml}
            </div>
        </div>
    `;
}

// Comment out the dynamic UI generation to avoid conflicts with dat.GUI
// document.addEventListener('DOMContentLoaded', function() {
//     const controlsContainer = document.getElementById('controls-container');
//     // Generate all UI controls
//     const allSectionsHtml = controlSections.map(section => createDropdownSection(section)).join('');
//     controlsContainer.innerHTML = allSectionsHtml;
//     // Initialize dropdown functionality
//     const dropdowns = document.querySelectorAll('.dropdown-header');
//     dropdowns.forEach(dropdown => {
//         dropdown.addEventListener('click', function() {
//             const content = this.nextElementSibling;
//             const icon = this.querySelector('.dropdown-icon');
            
//             // If this dropdown is already open, just close it
//             if (content.classList.contains('active')) {
//                 content.classList.remove('active');
//                 icon.classList.remove('active');
//                 return;
//             }
            
//             // Close all dropdowns first
//             document.querySelectorAll('.dropdown-content').forEach(item => {
//                 item.classList.remove('active');
//             });
//             document.querySelectorAll('.dropdown-icon').forEach(item => {
//                 item.classList.remove('active');
//             });
            
//             // Then open only this dropdown
//             content.classList.add('active');
//             icon.classList.add('active');
//         });
//     });
    
//     // Sync range inputs with text inputs
//     const rangeInputs = document.querySelectorAll('input[type="range"]');
//     rangeInputs.forEach(range => {
//         const id = range.id;
//         const textInput = document.getElementById(id + 'Text');
//         const valueSpan = document.getElementById(id + 'Value');
        
//         // Update text input when slider changes
//         range.addEventListener('input', function() {
//             textInput.value = this.value;
//             valueSpan.textContent = this.value;
//         });
        
//         // Update slider and render scene when text input changes (typing)
//         textInput.addEventListener('input', function() {
//             range.value = this.value;
//             valueSpan.textContent = this.value;
            
//             // Trigger the input event on the range to ensure rendering happens
//             const inputEvent = new Event('input', { bubbles: true });
//             range.dispatchEvent(inputEvent);
//         });
        
//         // Additional listener for change event (up/down buttons or on blur)
//         textInput.addEventListener('change', function() {
//             range.value = this.value;
//             valueSpan.textContent = this.value;
            
//             // Trigger the input event on the range to ensure rendering happens
//             const inputEvent = new Event('input', { bubbles: true });
//             range.dispatchEvent(inputEvent);
//         });
//     });
// });
