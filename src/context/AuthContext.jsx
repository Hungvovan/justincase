import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

// Simple deterministic hash (demo only — not cryptographically secure)
const simpleHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(16);
};

const USERS_KEY = 'jc_users';
const SESSION_KEY = 'jc_user';

const getStoredUsers = () => {
    try {
        let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
        // Seed default admin if missing
        const adminEmail = 'admin@justincase.com';
        if (!users.find(u => u.email === adminEmail)) {
            const adminUser = {
                id: 'admin-001',
                username: 'Admin',
                email: adminEmail,
                passwordHash: simpleHash('Admin@123'),
                authProvider: 'email',
                role: 'Admin',
                createdAt: new Date().toISOString(),
            };
            users.push(adminUser);
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
        }
        return users;
    }
    catch { return []; }
};

const getStoredSession = () => {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; }
    catch { return null; }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getStoredSession);

    const register = useCallback(({ username, email, password }) => {
        const users = getStoredUsers();
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            return { ok: false, error: 'An account with this email already exists.' };
        }
        const newUser = {
            id: Date.now().toString(),
            username,
            email: email.toLowerCase(),
            passwordHash: simpleHash(password),
            authProvider: 'email',
            createdAt: new Date().toISOString(),
        };
        localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
        const session = { id: newUser.id, username: newUser.username, email: newUser.email, authProvider: 'email' };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        setUser(session);
        return { ok: true };
    }, []);

    const login = useCallback(({ email, password }) => {
        const users = getStoredUsers();
        const found = users.find(
            u => u.email === email.toLowerCase() && u.passwordHash === simpleHash(password)
        );
        if (!found) {
            return { ok: false, error: 'Invalid email or password.' };
        }
        const session = { id: found.id, username: found.username, email: found.email, authProvider: found.authProvider || 'email' };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        setUser(session);
        return { ok: true };
    }, []);

    /**
     * OAuth login — called after Google/Facebook returns a profile.
     * Creates the user account on first OAuth login, then starts a session.
     * @param {{ provider: 'google'|'facebook', name: string, email: string, picture?: string }} profile
     */
    const loginWithOAuth = useCallback(({ provider, name, email, picture }) => {
        const users = getStoredUsers();
        let existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!existing) {
            // Auto-register OAuth user (no password)
            existing = {
                id: Date.now().toString(),
                username: name.split(' ')[0],
                email: email.toLowerCase(),
                passwordHash: null,
                authProvider: provider,
                picture: picture || null,
                createdAt: new Date().toISOString(),
            };
            localStorage.setItem(USERS_KEY, JSON.stringify([...users, existing]));
        }

        const session = {
            id: existing.id,
            username: existing.username,
            email: existing.email,
            authProvider: provider,
            picture: existing.picture || picture || null,
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        setUser(session);
        return { ok: true };
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(SESSION_KEY);
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, register, loginWithOAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
};
