export async function moveImage(el) {
  el.preventDefault();

  const imgElement = el.currentTarget.querySelector('img');
  const imgBox =
    el.currentTarget.getElementsByClassName('image-box-backdrop')[0];
  const rect = el.currentTarget.getBoundingClientRect();
  const topOffset = 108.6 - rect.top;
  const leftOffset = 30 - rect.left;

  document.body.style.overflow = 'hidden';
  imgElement.style.position = 'relative';
  imgElement.style.zIndex = '5';
  imgBox.classList.add('backdrop');
  imgElement.style.transform = `translate(${leftOffset}px, ${topOffset}px)`;

  const nextUrl = el.currentTarget.href;
  const response = await fetch(nextUrl);
  await new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }, 1000)
  );
  window.location.href = response.url;
}
