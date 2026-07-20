from djoser import email

class PasswordResetEmail(email.PasswordResetEmail):
    template_name = "email/password_reset.html"
    
    def get_subject(self):
        return "Reset your Cake Shop password"
    
    def get_context_data(self):
        context = super().get_context_data()

        context["url"] = f"http://localhost:5173/reset-password-confirm/{context['uid']}/{context['token']}"

        return context