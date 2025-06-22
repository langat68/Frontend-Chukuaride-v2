import { useState } from 'react'

export default function ImageUploader({ onUpload }: { onUpload: (url: string) => void }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    const formData = new FormData()
    formData.append('image', selectedFile)

    const res = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    if (data.imageUrl) {
      onUpload(data.imageUrl)
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" className="w-32 mt-2" />}
      <button onClick={handleUpload} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
        Upload
      </button>
    </div>
  )
}
