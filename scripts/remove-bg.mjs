import sharp from 'sharp'

const img = sharp('assets/Gemini_Generated_Image_ij5pthij5pthij5p.png')
const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true })

for (let i = 0; i < data.length; i += 4) {
  const r = data[i], g = data[i+1], b = data[i+2]
  if (r > 200 && g > 200 && b > 200) data[i+3] = 0
}

await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png()
  .toFile('public/logo.png')

await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png()
  .toFile('public/favicon.png')

console.log('Done')