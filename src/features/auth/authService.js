class AuthService {
    loginUser(formData) {
        if (
            formData.email === "customer@bankone.com" &&
            formData.password === "customer123"
        ) {
            return {
                success: true,
                user: {
                    id: "U1001",
                    name: "Fareha",
                    role: "CUSTOMER"
                },
                token: "mock-jwt-token"
            };
        }

        return {
            success: false
        };
    }
}

export default new AuthService();