const csv = require('csvtojson')
const fs = require('fs')
const path = require('path')
var f_data = []

const csv_to_json_v2 = (csvFilePath='customer-data.csv') => {
    console.log(`Starting conversion.`)
    const convertCSV = (r_csvFilePath, callback) => {
        csv()
            .fromFile(csvFilePath)
            .on('json', (jsonObj) => {
                f_data.push(jsonObj)
            })
            .on('done', (error) => {
                if (error) return console.error(error)
                console.log('Ended conversion.')
                var json_data = JSON.stringify(f_data, null, 2)
                callback(json_data)
            })
    }
    convertCSV(csvFilePath, (json_data) => {
        fs.writeFileSync(path.join(__dirname, 'customer-data_v2.json'), json_data)
        console.log('The conversion from csv to json is done')
        // console.log(json_data)
    })
}
csv_to_json_v2(process.argv[2])
