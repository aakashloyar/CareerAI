"use client"

import Rechart from './_components/rechart'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function TabsDemo() {
  return (
    <div className='flex justify-center pt-20'>
        <Tabs defaultValue="account" className="w-3/4">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                <TabsTrigger value="new">New Quiz</TabsTrigger>
            </TabsList>
            <TabsContent value="analysis">
                <Card>
                <CardHeader>
                    <CardTitle>Analysis</CardTitle>
                    <CardDescription>
                       Analyse your past exam here.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <Rechart/>
                    </div>
                </CardContent>
                <CardFooter>
                    {`Average Score=20%`}
                </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="new">
                <Card>
                <CardHeader>
                    <CardTitle>AI-powered Quiz</CardTitle>
                    <CardDescription>
                      Challenge yourself with our AI-powered quiz — personalized, smart, and always fresh!
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                    <Label htmlFor="topics">Topics</Label>
                    <Input id="current" type="text" />
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="no">Number of questions</Label>
                    <Input id="no" type="text" />
                    </div>
                    <div>
                    <Label htmlFor="time">Time(min)</Label>
                    <Input id="time" type="text" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Generate</Button>
                </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    </div>    
  )
}
