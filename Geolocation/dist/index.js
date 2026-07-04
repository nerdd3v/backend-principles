navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    console.log(latitude);
}, (error) => {
    console.log(error);
});
export {};
//# sourceMappingURL=index.js.map