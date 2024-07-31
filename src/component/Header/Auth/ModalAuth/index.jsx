import { useRef } from "react"
import Modal from "../../../Modal"
import Forget from "../Forget"
import SignIn from "../SignIn/signIn"
import SignUp from "../SignUp/signUp"
import { useGoogleLogin } from "@react-oauth/google"
import EmaliAuth from "../EmailAuth"
import { loginGoogle } from "../../../../apis/auth/http"
import ChangePassword from "../ChangePassword"
import { queryClient } from "../../../../util/configHttp"

function ModalAuth({ isOpen, onClose, modalActive, setModalActive, setIsErrorGoogle, isErrorGoogle }) {
    const emailAuth = useRef()
    const handleSignInGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const response = await loginGoogle({code: tokenResponse.code})
                if (response.status === 200) {
                    localStorage.setItem("accessToken", response.data.accessToken)
                    
                    queryClient.invalidateQueries({ queryKey: ["user"] })
                    onClose()
                    setModalActive()
                }
            } catch (error) {
                if (error.message) {
                    console.log(error)
                    setIsErrorGoogle(error.message)
                }
            }
        },
        flow: "auth-code",
        onError: (errorResponse) => {
            console.log(errorResponse)
        },
        onNonOAuthError: onNonOAuthError => {
            console.log(onNonOAuthError.message)
        }
    })
    return (
        <Modal closeOnEsc size={modalActive === "emailAuth" ? "lg" : null} isCentered={modalActive === "forget" || modalActive === "emailAuth" || modalActive === "changePassword"} isOpen={isOpen} onClose={onClose}>
            {modalActive === "login" && <SignIn isErrorGoogle={isErrorGoogle} setIsErrorGoogle={setIsErrorGoogle} onClose={onClose} setModalActive={setModalActive} loginGoogle={handleSignInGoogle} />}
            {modalActive === "signup" && <SignUp isErrorGoogle={isErrorGoogle} setIsErrorGoogle={setIsErrorGoogle} onClose={onClose} setModalActive={setModalActive} loginGoogle={handleSignInGoogle} />}
            {modalActive === "forget" && <Forget emailAuth={emailAuth} setModalActive={setModalActive} />}
            {modalActive === "emailAuth" && <EmaliAuth emailAuth={emailAuth.current} setModalActive={setModalActive} />}
            {modalActive === "changePassword" && <ChangePassword onClose={onClose} setModalActive={setModalActive} />}
        </Modal>
    )
}

export default ModalAuth