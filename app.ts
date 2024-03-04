import connectDatabase from "./src/loader/dbloader/mongoose"
import appLoader from "./src/loader/apploader/app"

connectDatabase()
  .then((response) =>  {
    console.log("Database connected.")
    appLoader()
  })
  .catch((error)=>  {
    console.log(error)
})

