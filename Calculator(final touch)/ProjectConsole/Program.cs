using Calculator;
using System;

class programm
{
    static void Main(string[] args)
    {
        bool exit = false;
        TParser parser = new TParser();
        double result;
        while (exit == false)
        {
            Console.Write("Введите выражение (exit для выхода):");
            string expression = Console.ReadLine();
            if (expression == "exit") break;

            result=parser.eval_exp(expression);
            Console.WriteLine("Ответ:"+result.ToString());
        }
    }
}