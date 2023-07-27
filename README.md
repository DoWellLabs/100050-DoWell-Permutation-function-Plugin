# DoWell-Permutation

### Version 1.0.0

### Description
Welcome to the Permutation package! The Permutation package is a comprehensive tool that enables users to generate permutations of a set of items efficiently. It provides a reliable and high-performance solution for permutation calculations, making it ideal for a wide range of applications such as combinatorial optimization, data analysis, and algorithm design.

### Installation
```javascript
    npm i uxlivinglab-dowell-permutation
```

# The main components are:
## Create:
The "Create" component is the starting point of the permutation process. It asks users to fill out three fields: variables per permutation, total variables, and the first variable. The component also accepts three props:
"onError" - a callback function that receives a message describing any errors that may occur as a parametar.
"onSuccess" - a callback function that receives an object as a parametar containing two properties: a message and "permutationDetails". You should store the "permutationDetails" somewhere as it will be useful when using other components.
"colors" - an object that contain's four properties:
primaryColor, secondaryColor, bgColor and textColor
#### example
```javascript

    import React from 'react'
    import { Create } from 'uxlivinglab-dowell-permutation'

    const App = () => {

        function handleErr(e){
            console.log(e)
        }
        function handleSuccess(e){
            console.log(e)
        }
        return (
            <main className='app'>
                <Create
                    colors={{
                        primaryColor: '#61ce70',
                        secondaryColor: '#cef9d2',
                        bgColor: '#F2F4F7',
                        textColor: '#344054'
                    }}
                    onError={handleErr}
                    onSuccess={handleSuccess}
                />
            </main>
        )
    }

export default App

```

## Edit:
The "Edit" component allows users to add more variables to a specific permutation. It prompts users to fill out two fields: the "insert id" (which can be obtained from the "permutationDetails" object when creating a new permutation) and the new variable. The component accepts four props:

"onError" - a callback function that receives a message describing any errors that may occur as a parameter.
"onSuccess" - a callback function that receives a message describing the new set of variables as a parameter.
"id" - the ID of the permutation. If you want to insert the ID without manually filling it in the form, you can leave it as an empty string.
"colors" - an object that contains four properties: primaryColor, secondaryColor, bgColor, and textColor.
#### example
```javascript

import React from 'react'
import { Edit } from 'uxlivinglab-dowell-permutation'

const App = () => {

    function handleErr(e){
        console.log(e)
    }
    function handleSuccess(e){
        console.log(e)
    }
    return (
        <main className='app'>
            <Edit
                onError={handleErr}
                onSuccess={handleSuccess}
                colors={{
                    primaryColor: '#61ce70',
                    secondaryColor: '#cef9d2',
                    bgColor: '#F2F4F7',
                    textColor: '#344054'
                }}
                id='64c14c31d96fb47cefee215c'
            />
        </main>
    )
}

export default App

```

## Settings:
The "Settings" component allows users to set each variable to what it stands for. For example, users can enter the letter 'D' and make it stand for 'doWell'. The component prompts users to fill out two fields: the variable and the word that stands for it. The component accepts four props:

"onError" - a callback function that receives a message describing any errors that may occur as a parameter.
"onSave" - a callback function that receives an array as a parameter for the new variable settings. You should store it as it will be helpful later on.
"previous" - an array for old settings variables so you can edit them. You can leave it as an empty array if you don't have any previous settings.
"colors" - an object that contains four properties: primaryColor, secondaryColor, bgColor, and textColor.
#### example
```javascript

import React from 'react'
import { Settings } from 'uxlivinglab-dowell-permutation'

const App = () => {
    function handleErr(e){
        console.log(e)
    }
    function handleSave(e){
        console.log(e)
    }
    return (
        <main className='app'>
            <Settings
                colors={{
                    primaryColor: '#61ce70',
                    secondaryColor: '#cef9d2',
                    bgColor: '#F2F4F7',
                    textColor: '#344054'
                }}
                onSave = {handleSave}
                onError = {handleErr}
                previous = {[]}
            />
        </main>
    )
}

export default App

```

## ShowOne:
The "ShowOne" component is used to display saved variables for a specific permutation. Users only need to fill in the insert_id field, which can be obtained when creating a new permutation. This component has five props:

"onError" - is a function that receives a message describing any errors that may occur.
"onSuccess" - is a function that runs when the permutation is found.
"onCopy" - is a function that receives the copied text from the user.
"varsToWords" - is an array of objects obtained from the settings component.
"colors" - is an object with four properties: primaryColor, secondaryColor, bgColor, and textColor.
#### example
```javascript

import React, { useState } from 'react'
import { ShowOne } from 'uxlivinglab-dowell-permutation'

const App = () => {
    function handleErr(e){
        console.log(e)
    }
    function handleSuccess(e){
        console.log(e)
    }
    function handleCopy(e){
        console.log(e)
    }

    return (
        <main className='app'>
            <ShowOne 
                colors={{
                    primaryColor: '#61ce70',
                    secondaryColor: '#cef9d2',
                    bgColor: '#F2F4F7',
                    textColor: '#344054'
                }}
                onError= {handleErr}
                onSuccess= {handleSuccess}
                onCopy = {handleCopy}
                varsToWords = {
                    [
                        {variable: 'D', word: 'dowell'},
                        {variable: 'U', word: 'uxlivinglabs'}
                    ]
                }
            />
        </main>
    )
}

export default App

```

## ShowMany:
The "ShowMany" component displays saved variables for multiple permutations. It has seven props:

"permutationsIds" is an array of objects obtained when creating new permutations.
"onError" is a function that receives a message describing any errors that may occur.
"onSuccess" is a function that runs when all permutations are found.
"onCopy" is a function that receives the copied text from the user.
"onDelete" is a function that receives the new set of permutations after deleting one.
"varsToWords" is an array of objects obtained from the settings component.
"colors" is an object with four properties: primaryColor, secondaryColor, bgColor, and textColor.
#### example
```javascript

import React, { useState } from 'react'
import { ShowMany } from 'uxlivinglab-dowell-permutation'

const App = () => {
    const [permutationsIds,setPermuatationsIds] = useState([
        {date:"7/26/2023",id:"64c15bbab96fd9a865a90a8d"},
        {date:"7/25/2023",id:"64c15be8d96fb47cefee227f"}
    ])

    function handleErr(e){
        console.log(e)
    }
    function handleSuccess(e){
        console.log(e)
    }
    function handleCopy(e){
        console.log(e)
    }
    function handleDelete(e){
        setPermuatationsIds(e)
    }

    return (
        <main className='app'>
            <ShowMany 
                colors={{
                    primaryColor: '#61ce70',
                    secondaryColor: '#cef9d2',
                    bgColor: '#F2F4F7',
                    textColor: '#344054'
                }}
                permutationsIds= {permutationsIds}
                onError= {handleErr}
                onSuccess= {handleSuccess}
                onCopy = {handleCopy}
                onDelete = {handleDelete}
                varsToWords = {
                    [
                        {variable: 'D', word: 'dowell'},
                        {variable: 'U', word: 'uxlivinglabs'}
                    ]
                }
            />
        </main>
    )
}

export default App

```