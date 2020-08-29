class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = "";
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;

    }

    type() {
        const current = this.wordIndex % this.words.length;
        // getting the full text of current word
        const fullTxt = this.words[current];

        if(this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1 );
        }
        // Inserting text

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

        let typeSpeed = 300;
        if(this.isDeleting) {
            typeSpeed /= 2;
        }

        // If this word is complete
        if(!this.isDeleting && this.txt === fullTxt) {
            // A pause required
            typeSpeed =this.wait;
            // set delete to true
            this.isDeleting = true;
        }
        else if (this.isDeleting && this.txt === "") {
            this.isDeleting = false;
            this.wordIndex++;
            // A break before typing
            typeSpeed= 500;
        }
        setTimeout(() => this.type(), typeSpeed);
    }

}
// Initialize DOM load 
document.addEventListener("DOMContentLoaded", init);

function init() {
    const txtElement = document.querySelector(".txt-type");
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute("data-wait");

    // Initializing Typewriter

    new TypeWriter(txtElement, words, wait);
}