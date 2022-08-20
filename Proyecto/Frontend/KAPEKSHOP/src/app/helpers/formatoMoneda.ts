const formatearDinero = (cantidad: any) => {
    return cantidad.toLocaleString('en-US',{
        style:'currency',
        currency:'HNL'
    })
}

export default formatearDinero;