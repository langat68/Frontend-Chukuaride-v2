import { useState } from 'react'

export default function UserDocuments({ onUpload }: { onUpload: (files: File[]) => void }) {
  const [files, setFiles] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFiles = Array.from(e.target.files)
      setFiles(uploadedFiles)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpload(files)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*,.pdf" multiple onChange={handleFileChange} />
      <button type="submit">Upload Documents</button>
    </form>
  )
}
