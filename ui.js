// Initialize dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown-header');
    
    // No dropdown open by default (removed the code that opened the first one)
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.dropdown-icon');
            
            // If this dropdown is already open, just close it
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                icon.classList.remove('active');
                return;
            }
            
            // Close all dropdowns first
            document.querySelectorAll('.dropdown-content').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelectorAll('.dropdown-icon').forEach(item => {
                item.classList.remove('active');
            });
            
            // Then open only this dropdown
            content.classList.add('active');
            icon.classList.add('active');
        });
    });
    
    // Sync range inputs with text inputs
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    rangeInputs.forEach(range => {
        const id = range.id;
        const textInput = document.getElementById(id + 'Text');
        const valueSpan = document.getElementById(id + 'Value');
        
        // Update text input when slider changes
        range.addEventListener('input', function() {
            textInput.value = this.value;
            valueSpan.textContent = this.value;
            
            // No need to trigger an additional event here as the slider's input event is already handled
        });
        
        // Update slider and render scene when text input changes (typing)
        textInput.addEventListener('input', function() {
            range.value = this.value;
            valueSpan.textContent = this.value;
            
            // Trigger the input event on the range to ensure rendering happens
            const inputEvent = new Event('input', { bubbles: true });
            range.dispatchEvent(inputEvent);
        });
        
        // Additional listener for change event (up/down buttons or on blur)
        textInput.addEventListener('change', function() {
            range.value = this.value;
            valueSpan.textContent = this.value;
            
            // Trigger the input event on the range to ensure rendering happens
            const inputEvent = new Event('input', { bubbles: true });
            range.dispatchEvent(inputEvent);
        });
    });
});
