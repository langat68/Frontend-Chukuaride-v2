

type Props = {
  licenseUrl?: string
  idCardUrl?: string
  onUpload: (type: 'license' | 'id', file: File) => void
}

export default function UserDocuments({ licenseUrl, idCardUrl, onUpload }: Props) {
  const handleChange = (type: 'license' | 'id', e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onUpload(type, e.target.files[0])
    }
  }

  return (
    <div>
      <h3>My Documents</h3>
      <p>Driver’s License: {licenseUrl ? <a href={licenseUrl} target="_blank">View</a> : 'Not uploaded'}</p>
      <input type="file" accept="image/*" onChange={(e) => handleChange('license', e)} />

      <p>ID Card: {idCardUrl ? <a href={idCardUrl} target="_blank">View</a> : 'Not uploaded'}</p>
      <input type="file" accept="image/*" onChange={(e) => handleChange('id', e)} />
    </div>
  )
}
