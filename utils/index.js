const config = useRuntimeConfig()
const gitUsername = config.public.git_username
const gitRepo = config.public.git_repo
const gitToken = config.public.git_token

// Save the new file using GitHub API (simplified for demonstration)
const saveToGitHub = async (fileName, markdownContent) => {
  const response = await fetch(`https://api.github.com/repos/${gitUsername}/${gitRepo}/contents/` + fileName, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${gitToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Create new page: ' + fileName,
      content: btoa(markdownContent), // Convert the markdown content to base64
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to save to GitHub')
  }

  const data = await response.json()
  console.log('Page created on GitHub:', data)
}

// GitHub commit function to upload the file
const saveMediaToGitHub = async (filePath, fileContent, message) => {
  const url = `https://api.github.com/repos/${gitUsername}/${gitRepo}/contents/${filePath}`

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  const data = {
    message, // Commit message
    content: fileContent, // Base64 file content
    branch: 'main', // Branch to commit to
  }

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'GitHub API error')
    }

    return { success: true, fileUrl: result.content.download_url }
  } catch (error) {
    console.error('Error committing to GitHub:', error)
    return { success: false }
  }
}

const checkUserSessionValid = () => {
  const router = useRouter()
  const userCookie = useCookie('user')
  if (!userCookie.value) router.push('/admin/login')

  const expirationDate = addDays(new Date(userCookie.value.lastLogin), userCookie.value.expiration)
  if (expirationDate < new Date()) {
    console.log('Session expired', expirationDate)
    userCookie.value = null
    return false
  }
  return true
}

const addDays = (date, days) => {
  const newDate = new Date(date)
  newDate.setDate(date.getDate() + days)
  return newDate
}

export { saveToGitHub, checkUserSessionValid, saveMediaToGitHub }
