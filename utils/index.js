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

const saveMediaToGitHub = async (fileName, path, fileContent) => {
  const response = await fetch(`https://api.github.com/repos/${gitUsername}/${gitRepo}/public/${path}` + fileName, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${gitToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Create new media: ' + fileName,
      content: btoa(fileContent), // Convert the markdown content to base64
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to save to GitHub')
  } else {
    const data = await response.json()
    console.log('Media created on GitHub:', data)
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
