import '../styles/tailwind.css'; // Ensure correct path
import { Outlet, ScrollRestoration, useRouteError, isRouteErrorResponse } from '@remix-run/react';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
    console.error('Error in component tree', error);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <h1 className="text-3xl font-bold mb-4">Oops! An error occurred.</h1>
            <p className="text-lg">{error.message}</p>
            <button
                onClick={resetErrorBoundary}
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
                Try again
            </button>
        </div>
    );
}

export default function Root() {
    return (
        <html lang="en">
            <head>
                <title>Dean Machines</title>
                <meta name="description" content="FPV Prototype Web App" />
                <link rel="stylesheet" href="/styles/tailwind.css" /> {/* Ensure correct path */} 
            </head>
            <body className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                {/* Remove Navbar component */}
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Outlet />
                </ErrorBoundary>
                <ScrollRestoration />
            </body>
        </html>
    );
}

export function CatchBoundary() {
    const caught = useRouteError();
    if (isRouteErrorResponse(caught)) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                <h1 className="text-3xl font-bold mb-4">Oops!</h1>
                {caught.status === 500 ? (
                    <p className="text-lg">Internal Server Error</p>
                ) : caught.status === 404 ? (
                    <p className="text-lg">Page Not Found</p>
                ) : caught.status === 401 ? (
                    <p className="text-lg">Unauthorized</p>
                ) : (
                    <p className="text-lg">
                        {caught.status} {caught.statusText} {caught.data?.message}
                    </p>
                )}
            </div>
        );
    } else if (caught instanceof Error) {
        console.error("Client-side error", caught);
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                <h1 className="text-3xl font-bold mb-4">Oops!</h1>
                <p className="text-lg">A client-side error occurred.</p>
                <p className="text-lg">Error Message: {caught.message}</p>
            </div>
        );
    } else {
        console.error("Unexpected error", caught);
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                <h1 className="text-3xl font-bold mb-4">Oops!</h1>
                <p className="text-lg">An unexpected error occurred.</p>
            </div>
        );
    }
}
