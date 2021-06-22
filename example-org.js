const Signup = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const clearState = () => {
        setUsername('')
        setEmail('')
        setPassword('')
        setPasswordConfirmation('')
    }

    const handleSubmit = signupUser => e => {
        e.preventDefault()
        signupUser().then(data => {
            console.log(data)
            clearState() // <-----------
        })
    }

    return <JSX />
}

export default Signup