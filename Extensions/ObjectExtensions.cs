using System.Runtime.CompilerServices;

namespace SMS.Extensions
{
    public static class ObjectExtensions
    {
        public static string MethodName(this object caller, [CallerMemberName] string name = null) {
            return name;
        }  
    }
}