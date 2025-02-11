export function Success() {
    return (
        <div className="flex justify-center items-start min-h-screen bg-green-100 pt-20">
            <h1 className="text-4xl font-semibold text-green-700">Thank you for your purchase!</h1>
        </div>
    );
}

export function Cancel() {
    return (
        <div className="flex justify-center items-start min-h-screen bg-red-100 pt-20">
            <h1 className="text-4xl font-semibold text-red-700">sorry to see you cancel your order come back soon!</h1>
        </div>
    );
}
