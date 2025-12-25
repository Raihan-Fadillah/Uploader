export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Tampilkan halaman form jika GET tanpa prompt
    if (request.method === 'GET' && !url.searchParams.has('prompt')) {
      return new Response(renderFormPage(), {
        headers: { 'content-type': 'text/html' },
      });
    }

    // Handle form POST
    if (request.method === 'POST') {
      const formData = await request.formData();
      const prompt = formData.get('prompt') || 'cyberpunk cat';

      const inputs = { prompt };
      const response = await env.AI.run(
        '@cf/stabilityai/stable-diffusion-xl-base-1.0',
        inputs
      );

      return new Response(response, {
        headers: { 'content-type': 'image/png' },
      });
    }

    // Jika GET dengan ?prompt
    const prompt = url.searchParams.get('prompt') || 'cyberpunk cat';
    const inputs = { prompt };
    const response = await env.AI.run(
      '@cf/stabilityai/stable-diffusion-xl-base-1.0',
      inputs
    );

    return new Response(response, {
      headers: { 'content-type': 'image/png' },
    });
  },
};

function renderFormPage() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>𝐀𝐫𝐞𝐱𝐚𝐧𝐬 𝐀𝐈 𝐈𝐦𝐚𝐠𝐞 𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐨𝐫</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      font-family: 'Poppins', sans-serif;
    }
  </style>
</head>
<body class="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen flex items-center justify-center px-4">
  <div class="bg-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-md">
    <h1 class="text-2xl font-semibold text-center mb-6 text-cyan-400">🎨 𝐀𝐫𝐞𝐱𝐚𝐧𝐬 𝐀𝐈 𝐈𝐦𝐚𝐠𝐞 𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐨𝐫</h1>
    <form method="POST" class="flex flex-col gap-4">
      <input 
        type="text" 
        name="prompt" 
        placeholder="Masukkan prompt, contoh: cyberpunk cat" 
        required 
        class="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
      />
      <button 
        type="submit" 
        class="py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition"
      >
        Generate Image
      </button>
    </form>
    <p class="text-center text-xs text-gray-500 mt-6">𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐀𝐫𝐞𝐱𝐚𝐧𝐬 𝐀𝐈 </p>
  </div>
</body>
</html>
  `;
}