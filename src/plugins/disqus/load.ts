export default (shortName: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");

    script.src = `//${shortName}.disqus.com/embed.js`;
    script.async = true;
    script.setAttribute("data-timestamp", String(+new Date()));

    const head = document.head || document.getElementsByTagName("head")[0];
    head.appendChild(script);

    script.onload = resolve;
    script.onerror = reject;
  });
};
