var electronInstaller = require('electron-winstaller');

var settings = 
{
    appDirectory: './ERCGK-win32-ia32',
    outputDirectory: './ERCGK_Installers',
    authors: 'ERCGK',
    exe: './ERCGK.exe',
    noMsi: true,
    setupExe: 'ercgk-installer-x32.exe',
    loadingGif: './img/load.gif',
    setupIcon: './img/icon.ico'
};

resultPromise = electronInstaller.createWindowsInstaller(settings);
 
resultPromise.then(() => 
{
    console.log("Instalador creado.");
}, (e) => {
    console.log(`Error: ${e.message}`)
});
