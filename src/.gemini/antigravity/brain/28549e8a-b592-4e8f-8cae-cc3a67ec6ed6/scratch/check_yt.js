async function main() {
  const url = 'https://www.youtube.com/@shivdix';
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    }
  });
  const html = await res.text();
  
  console.log("HTML length:", html.length);
  
  let idx = 0;
  const lowerHtml = html.toLowerCase();
  while ((idx = lowerHtml.indexOf('joined', idx)) !== -1) {
    console.log("Found 'joined' at:", idx);
    console.log(html.substring(idx - 100, idx + 200));
    console.log("-----------------------------------------");
    idx += 6;
  }
}

main().catch(console.error);
