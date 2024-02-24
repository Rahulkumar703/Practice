

export async function generateMetadata({ params }) {
    return {
        title: decodeURI(params.title),
        description: `solve the problem ${decodeURI(params.title)}`,
    };
}

const DashboardLayout = ({ children }) => {
    return (
        children
    )
}

export default DashboardLayout
