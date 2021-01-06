function handleSeed()
{
    if (typeof handleSeed.i == 'undefined')
    {
        handleSeed.i = 0
    }
    else
    {
        ++handleSeed.i
    }

    return handleSeed.i.toString(16)
}

module.exports = handleSeed