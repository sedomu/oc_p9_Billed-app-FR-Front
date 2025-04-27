const newBillData = {
    kind: "IT et électronique",
    name: "Free mobile",
    date: "2021-01-01",
    amount: "80",
    vat: "16",
    vatRate: "20",
    comment: "Facture de janvier",
    file: new File(["test"], "test.png", { type: "image/png" })
}

export default newBillData;