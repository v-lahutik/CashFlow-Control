export const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return null; // Return null if the date is invalid
    }
    
    // Format the date as YYYY-MM-DD
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-CA', options); // 'en-CA' gives YYYY-MM-DD format
};
