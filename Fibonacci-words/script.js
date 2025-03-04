document.addEventListener('DOMContentLoaded', () => {
    const savedText = localStorage.getItem('savedText');
    if (savedText) {
        document.getElementById('textInput').value = savedText;
        updateCounts();
    }
    displayFibonacciSeries(); // Added function call to display Fibonacci series
});

document.getElementById('textInput').addEventListener('input', updateCounts);
document.getElementById('textInput').addEventListener('blur', saveText);
document.getElementById('textInput').addEventListener('keyup', highlightCurrentLine);

function updateCounts() {
    const text = document.getElementById('textInput').value;
    const lines = text.split('\n');
    const countsContainer = document.getElementById('counts');
    countsContainer.innerHTML = '';

    const fibonacciNumbers = getFibonacciNumbers(20);

    lines.forEach((line, index) => {
        const wordCount = line.trim().split(/\s+/).filter(word => word.length > 0).length;
        const charCount = line.length;

        const countRow = document.createElement('div');
        countRow.className = 'count-row';
        countRow.innerHTML = `<span>${index + 1}</span><span>${wordCount}</span><span>${charCount}</span>`;

        if (fibonacciNumbers.includes(wordCount)) {
            countRow.style.color = 'green';
        } else {
            countRow.style.color = 'red';
        }

        countsContainer.appendChild(countRow);
    });
}

function getFibonacciNumbers(n) {
    const fib = [0, 1];
    for (let i = 2; i < n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib;
}

function saveText() {
    const text = document.getElementById('textInput').value;
    localStorage.setItem('savedText', text);
}

function highlightCurrentLine() {
    const textArea = document.getElementById('textInput');
    const countsContainer = document.getElementById('counts');
    const lines = textArea.value.substr(0, textArea.selectionStart).split("\n");
    const currentLineIndex = lines.length - 1;

    Array.from(countsContainer.children).forEach((row, index) => {
        if (index === currentLineIndex) {
            row.style.backgroundColor = 'yellow';
        } else {
            row.style.backgroundColor = '';
        }
    });
}

function displayFibonacciSeries() {
    const fibonacciNumbers = getFibonacciNumbers(10); // Get first 10 Fibonacci numbers
    const fibonacciSeriesContainer = document.getElementById('fibonacciSeries');
    fibonacciSeriesContainer.innerHTML = `Fibonacci Series: ${fibonacciNumbers.join(', ')}`;
}
