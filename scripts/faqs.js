document.addEventListener('DOMContentLoaded', () => {
  const faqs = document.querySelectorAll('.faq');

  faqs.forEach(faq => {
    const question = faq.querySelector('h3');
    const answer = faq.querySelector('p');
    
    question.addEventListener('click', () => {
      faq.classList.toggle('active');
      
      faqs.forEach(otherFaq => {
        if (otherFaq !== faq) {
          otherFaq.classList.remove('active');
          otherFaq.querySelector('p').style.maxHeight = '0';
        }
      });
      
      if (faq.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = '0';
      }
    });
  });
});