const Auth = {
    async check() {
        try {
            const res = await fetch('api/me.php');
            const data = await res.json();
            if (data.authenticated) {
                localStorage.setItem('smartagri_user', JSON.stringify(data.user));
                return data.user;
            } else {
                localStorage.removeItem('smartagri_user');
                return null;
            }
        } catch (e) {
            console.error('Auth check failed', e);
            return null;
        }
    },

    getUser() {
        const u = localStorage.getItem('smartagri_user');
        return u ? JSON.parse(u) : null;
    },

    isAuthenticated() {
        return !!this.getUser();
    },

    async login(email, password) {
        try {
            const res = await fetch('api/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const text = await res.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                console.error('Invalid JSON response:', text);
                alert('Server Error: ' + text.substring(0, 100));
                return false;
            }

            if (data.success) {
                localStorage.setItem('smartagri_user', JSON.stringify(data.user));
                return true;
            } else {
                alert(data.message);
                return false;
            }
        } catch (e) {
            console.error(e);
            alert('Terjadi kesalahan koneksi jaringan');
            return false;
        }
    },

    async register(name, email, password) {
        try {
            const res = await fetch('api/register.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            
            const text = await res.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                console.error('Invalid JSON response:', text);
                alert('Server Error: ' + text.substring(0, 100));
                return false;
            }

            if (data.success) {
                return true;
            } else {
                alert(data.message);
                return false;
            }
        } catch (e) {
            console.error(e);
            alert('Terjadi kesalahan koneksi jaringan');
            return false;
        }
    },

    async logout() {
        await fetch('api/logout.php');
        localStorage.removeItem('smartagri_user');
        window.location.href = 'landing.html';
    },

    async requireAuth() {
        const user = await this.check();
        if (!user) {
            window.location.href = 'landing.html'; // Changed from login.html to landing.html as main entry
        }
    }
};
