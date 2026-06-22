using System;
using System.Net.Http;
using System.Windows;

namespace BDF.M365.Diagnostic.UI;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
    }

    private void BtnManifest_Click(object sender, RoutedEventArgs e)
    {
        TxtOutput.AppendText("Manifest Analyzer OK\r\n");
    }

    private async void BtnGithub_Click(object sender, RoutedEventArgs e)
    {
        string[] urls =
        {
            "https://dellasiegaexternal2.github.io/MesArchivesAddin/src/taskpane/taskpane.html",
            "https://dellasiegaexternal2.github.io/MesArchivesAddin/src/commands/commands.html"
        };

        using HttpClient client = new();

        foreach (var url in urls)
        {
            try
            {
                var response = await client.GetAsync(url);

                TxtOutput.AppendText(
                    $"{url} => {(int)response.StatusCode}\r\n");
            }
            catch (Exception ex)
            {
                TxtOutput.AppendText(
                    $"{url} => ERROR {ex.Message}\r\n");
            }
        }
    }
}