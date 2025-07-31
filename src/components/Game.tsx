'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WaterGameWrapped() {
  const [waterLevel, setWaterLevel] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [result, setResult] = useState<'win' | 'lose' | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const targetLine = 65;

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setWaterLevel(prev => {
          if (prev >= 100) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            setResult('lose');
            setShowDialog(true);
            return 100;
          }
          return prev + 1;
        });
      }, 100);
    }
    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);

  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current!);
      setIsRunning(false);
      if (Math.abs(waterLevel - targetLine) <= 5) {
        setResult('win');
      } else {
        setResult('lose');
      }
      setShowDialog(true);
    } else {
      setWaterLevel(0);
      setIsRunning(true);
    }
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-center p-4"
      style={{ zIndex: 10 }}
    >
      <div className="relative w-full flex items-center justify-center">
        <div className="relative w-full flex items-center justify-center">
          <div
            className="w-[98vw] max-w-[1800px] bg-white/10 backdrop-blur-[50px] rounded-3xl shadow-2xl border border-[#00A591]/20 flex flex-col justify-center items-center mx-auto overflow-hidden"
            style={{
              marginTop: '120px',
              marginBottom: '24px',
              minHeight: 'calc(75vh)',
            }}
          >
            {/* Label */}
            <Badge className="absolute top-4 left-4 bg-blue-100 text-blue-700 text-5xl">Game</Badge>

            {/* Title */}
            <h2 className="text-[32px] font-bold text-[#1459B8] mt-6 mb-2 font-montserrat">
              Fill the Cup
            </h2>

            {/* Game Area */}
            <div className="w-[120px] h-[180px] relative border-4 border-blue-300 rounded-b-full overflow-hidden bg-gray-100 shadow-lg">
              {/* Water Level */}
              <motion.div
                className="absolute bottom-0 left-0 w-full bg-blue-500 transition-all duration-100"
                style={{ height: `${waterLevel}%` }}
                initial={{ height: 0 }}
                animate={{ height: `${waterLevel}%` }}
                transition={{ duration: 0.1 }}
              />
              {/* Target Line */}
              <div
                className="absolute left-0 w-full border-t-2 border-dashed border-red-600"
                style={{ bottom: `${targetLine}%` }}
              >
                <div className="absolute right-2 text-xs text-red-600">Target</div>
              </div>
            </div>

            {/* Button */}
            <Button onClick={handleStartStop} className="mt-6 w-32">
              {isRunning ? 'Stop' : 'Start'}
            </Button>

            {/* Modal */}
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogContent className="sm:max-w-[400px] text-center">
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    {result === 'win' ? (
                      <span className="text-green-600 flex justify-center items-center gap-2">
                        <Sparkles className="w-6 h-6" /> You Won!
                      </span>
                    ) : (
                      <span className="text-red-600">You Lost</span>
                    )}
                  </DialogTitle>
                </DialogHeader>
                {result === 'lose' ? (
                  <p className="text-sm mt-2 text-muted-foreground">
                    You overfilled the cup! That caused water wastage.
                  </p>
                ) : (
                  <p className="text-sm mt-2 text-muted-foreground">
                    Perfect timing! You stopped just at the right moment.
                  </p>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
