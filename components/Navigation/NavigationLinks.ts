export interface NavigationLink {
    id: number,
    title: string,
    href: string,
    isUserAuthenticated?: boolean,
}

const menuLinks: NavigationLink[] = [
    {
        id: 1,
        title: 'Home',
        href: '/',
    },
    {
        id: 2,
        title: 'Dashboard',
        href: '/dashboard',
    },
]


export {menuLinks}
