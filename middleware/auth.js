export default function({ store, route, req, res, redirect }) {
    if (!store.state.user || !store.state.user.email) {
        return redirect('/login');
    }
}
