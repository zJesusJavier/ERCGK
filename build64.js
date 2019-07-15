var electronInstaller = require('electron-winstaller');

var settings = 
{
    appDirectory: './ERCGK-win32-x64',
    outputDirectory: './ERCGK_Installers',
    authors: 'ERCGK',
    exe: './ERCGK.exe',
    setupExe: 'ercgk-installer-x64.exe',
    loadingGif: './ERCGK-win32-x64/resources/app/img/load.gif',
    setupIcon: './ERCGK-win32-x64/resources/app/img/icon.ico'
};

resultPromise = electronInstaller.createWindowsInstaller(settings);
 
resultPromise.then(() => 
{
    console.log("Instalador creado.");
}, (e) => {
    console.log(`Error: ${e.message}`)
});
