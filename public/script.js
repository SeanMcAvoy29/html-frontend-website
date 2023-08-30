//code for form submission
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const message = form.elements.message.value;
    alert(`Thank You for your Message, ${name}! We will get back to you at ${email} as soon as possible.`);
    form.reset();
    console.log("Ran");
})