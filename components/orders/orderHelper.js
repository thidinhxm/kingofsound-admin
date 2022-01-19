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

exports.formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-GB', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
    });
}

exports.formatDateFollowMMDDYYY = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}
exports.formatMonthYear = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-GB', {
        month: 'numeric',
        year: 'numeric',
        hour12: false
    });
}