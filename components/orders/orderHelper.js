exports.compareStatus = function(status, statusToCompare) {
    return status === statusToCompare;
};

exports.formatPrice = (price) => {
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

exports.formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-GB', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
        });
}

exports.formatMonthYear = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-GB', {
        month: 'numeric',
        year: 'numeric',
        hour12: false
    });
}